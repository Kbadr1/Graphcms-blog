import { request, gql } from "graphql-request";

const API =
  "https://api-eu-central-1.graphcms.com/v2/ckx0vn7ff19s901w8fazo57t3/master";

export const getCategories = async () => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(API, query);
  return result.categories;
};

export const getArticles = async () => {
  const query = gql`
    query getArticles {
      articlesConnection {
        edges {
          cursor
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            shortDescription
            image {
              url
            }
            category {
              slug
              name
            }
          }
        }
      }
    }
  `;

  const result = await request(API, query);
  return result.articlesConnection.edges;
};

export const getCategoryArticles = async (slug) => {
  const query = gql`
    query getCategoryArticles($slug: String!) {
      articlesConnection(where: { category: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            shortDescription
            image {
              url
            }
            category {
              name
              slug
              image {
                url
              }
            }
          }
        }
      }
    }
  `;

  const result = await request(API, query, { slug });
  return result.articlesConnection.edges;
};

export const getRecentArticles = async () => {
  const query = gql`
    query getRecentArticles {
      articles(orderBy: createdAt_ASC, last: 3) {
        title
        createdAt
        slug
        id
      }
    }
  `;
  const result = await request(API, query);

  return result.articles;
};

export const getArticleDetails = async (slug) => {
  const query = gql`
    query getArticleDetails($slug: String!) {
      article(where: { slug: $slug }) {
        title
        shortDescription
        image {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        category {
          name
          slug
        }
      }
    }
  `;

  const result = await request(API, query, { slug });

  return result.article;
};
