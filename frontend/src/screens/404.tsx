import { createUseStyles } from 'react-jss'

import Content from '../components/Content'
import Layout from '../components/Layout'
import Section from '../components/Section'
import theme from '../helpers/theme'

const useStyles = createUseStyles( {
  link: {
    color: theme.Blue,
  },
} )

const NotFound = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Content>
        <Section>
          <h1>404</h1>
          <p>
            The page you are looking for was not found.
            {' '}
            If this is an error, please open an issue on
            {' '}
            <a
              className={classes.link}
              href="https://github.com/shabados/viewer/issues/new/choose"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </Section>
      </Content>
    </Layout>
  )
}

export default NotFound
