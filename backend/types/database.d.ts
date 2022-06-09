declare module '@shabados/database' {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { Model, QueryBuilder } from 'objection'

  export const knex: ReturnType<Model['$knex']>

  export const Lines: typeof Model

  export type LinesQueryBuilder = QueryBuilder<Lines> & {
    withTranslations: ( fn: ( query: QueryBuilder<never> )=> any ) => QueryBuilder<Lines>,
  }

  export type TranslationResult = {
    lineId: string,
    translationSourceId: number,
    translation: string,
    english?: string,
    translationSource: TranslationSourcesResult,
    additionalInformation: string,
  }

  export type LinesResult = {
    id: string,
    shabadId: string,
    sourcePage: number,
    sourceLine: number,
    firstLetters: string,
    vishraamFirstLetters: string,
    gurmukhi: string,
    pronunciation: string,
    pronunctiationInformation: string,
    typeId: number,
    orderId: number,
  }

  export const Shabads: typeof Model

  export type ShabadsResult = {
    id: string,
    sourceId: number,
    writerId: number,
    sectionId: number,
    subsectionId: number,
    sttmId: number,
    orderId: number,
  }

  export const TranslationSources: typeof Model

  export type LanguageResult = {
    id: number,
    nameGurmukhi: string,
    nameEnglish: string,
    nameInternational: string,
  }

  export type TranslationSourcesResult = {
    id: number,
    nameGurmukhi: string,
    nameEnglish: string,
    sourceId: number,
    languageId: number,
    language: LanguageResult,
  }
}
