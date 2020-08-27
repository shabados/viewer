
import { readJSON, remove, move } from 'fs-extra'
import { manifest, extract } from 'pacote'
import importFresh from 'import-fresh'
import { Lines, Shabads, knex, TranslationSources } from '@shabados/database'

import { dependencies } from './package.json'

const databasePackage = `@shabados/database@${dependencies[ '@shabados/database' ]}`

// Check every 5 minutes for updates
const UPDATE_CHECK_INTERVAL = 5 * 60 * 1000
const UPDATE_TMP_FOLDER = 'temp'

/**
 * Gets all the DB sources.
 */
export const getSources = () => Shabads
  .query()
  .select( 'sources.id', 'name_gurmukhi', 'name_english', 'page_name_gurmukhi', 'page_name_english', 'length' )
  .distinct( 'source_id' )
  .join( 'sources', 'sources.id', 'shabads.source_id' )

/**
 * Gets all the DB translation sources.
 */
export const getTranslationSources = () => TranslationSources.query().eager( 'language' )

/**
 * Get all the lines on a page for a source.
 * @param {number} sourceId The ID of the source to use.
 * @param {number} page The page in the source to retrieve all lines from.
 */
export const getLinesOnPage = ( sourceId, page ) => Lines
  .query()
  .join( 'shabads', 'shabads.id', 'lines.shabad_id' )
  .eager( 'shabad.[section, subsection]' )
  .where( 'source_page', page )
  .andWhere( 'shabads.source_id', sourceId )
  .orderBy( 'order_id' )

/**
 * Gets a line for the source page.
 * @param {number} sourceId The ID of the source to use.
 * @param {number} page The page in the source to retrieve all lines from.
 * @param {string} lineIndex The index of the line on the source's page.
 */
export const getLineOnPage = async ( sourceId, page, lineIndex ) => Lines
  .query()
  .join( 'shabads', 'shabads.id', 'lines.shabad_id' )
  .where( 'source_page', page )
  .andWhere( 'shabads.source_id', sourceId )
  .withTranslations()
  .orderBy( 'order_id' )
  .offset( lineIndex )
  .then( ( [ { translations, ...line } ] ) => ( {
    ...line,
    translations: translations.map( ( { additionalInformation, ...translation } ) => ( {
      ...translation,
      additionalInformation: JSON.parse( additionalInformation ),
    } ) ),
  } ) )

/**
 * Gets a line, and the line index for the page.
 * Todo: Performance can be increased by not querying getLinesOnPage().
 * @param {string} id The id of the line.
 */
export const getLine = async id => {
  const line = await Lines
    .query()
    .eager( 'shabad' )
    .where( 'lines.id', id )
    .first()

  const pageLines = await getLinesOnPage( line.shabad.sourceId, line.sourcePage )

  const index = pageLines.findIndex( ( { id } ) => id === line.id )

  return { ...line, index }
}

/**
 * Determines whether the database is the latest version, according to semver.
 * @async
 * @returns {boolean} Whether or not the latest database is installed.
 */
export const isLatestDatabase = async () => {
  // Read package.json database semver and database package file
  const [ remotePackage, localPackage ] = await Promise.all( [
    manifest( databasePackage ),
    readJSON( 'node_modules/@shabados/database/package.json', 'utf-8' ),
  ] )

  console.log( 'Local Database Version:', localPackage.version )
  console.log( 'Remote Database Version:', remotePackage.version )

  return localPackage.version === remotePackage.version
}

/**
 * Get local database version.
 * @async
 * @returns {string} Local database verison.
 */
export const getDbVersion = async () => {
  // Read package.json database semver and database package file
  const { version } = await readJSON( 'node_modules/@shabados/database/package.json', 'utf-8' )

  return version
}

/**
 * Downloads the latest version of the database, according to semver.
 * Hot-reloads the data only.
 * ! Code will not be hot-reloaded, and code updates require a restart.
 * @async
 */
export const updateDatabase = async () => {
  // Download and extract the database package from npm
  console.log( `Downloading database update to ${UPDATE_TMP_FOLDER}` )
  await remove( UPDATE_TMP_FOLDER )
  await extract( databasePackage, UPDATE_TMP_FOLDER )

  console.log( 'Hot-patching database module' )
  // Disconnect the Shabad OS database connection
  await knex.destroy()
  // Move across the updated npm database module
  await move( UPDATE_TMP_FOLDER, 'node_modules/@shabados/database', { overwrite: true } )
  // Reimport the database
  //! Relies on knex being reinitialised globally
  importFresh( '@shabados/database' )
}

/**
 * Checks for database updates, according to semver, and updates if there are.
 * @async
 */
export const checkUpdates = async () => {
  console.log( `Checking for database updates satisfying ${databasePackage}` )

  // Exit if there aren't any updates
  if ( await isLatestDatabase() ) {
    console.log( 'No database updates available' )
    return
  }

  await updateDatabase()
  console.log( 'Database successfully updated' )
}

/**
 * Provides a recursive update checking function.
 * Checks for updates at constant interval.
 */
export const updateLoop = async () => checkUpdates()
  .catch( err => console.error( 'Unable to check for updates', err ) )
  .finally( () => setTimeout( updateLoop, UPDATE_CHECK_INTERVAL ) )
