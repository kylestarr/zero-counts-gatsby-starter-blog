import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const GameboyTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const seoThumbnail = post.frontmatter.thumbnail.childImageSharp.original.src

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        thumbnail={seoThumbnail}
        thumbnailAlt={post.frontmatter.thumbnailAlt}
      />

      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <time>{post.frontmatter.date}</time>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <nav id="post-pagination">
        {next && (
          <Link
            to={`/gameboys/${next.frontmatter.slug}`}
            rel="next"
            className="next-post"
          >
            {next.frontmatter.title} →
          </Link>
        )}
        {previous && (
          <Link
            to={`/gameboys/${previous.frontmatter.slug}`}
            rel="prev"
            className="prev-post"
          >
            ← {previous.frontmatter.title}
          </Link>
        )}
      </nav>
    </Layout>
  )
}

export default GameboyTemplate

export const pageQuery = graphql`
  query GameboyByfilePath($filePath: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { filePath: { eq: $filePath } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        thumbnail {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    }
  }
`
