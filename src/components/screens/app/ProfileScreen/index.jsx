/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '../../../foundation/layout/Grid';
import Button from '../../../commons/Button';
import Text from '../../../foundation/Text';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  position: absolute;
  top: 0;
  left: 0;
  padding: 4px;
  
  ${breakpointsMedia({
    lg: { padding: '16px' },
  })}
`;

const UserCard = styled.section`
  display: flex;
  margin: 16px 0;
  align-items: center;

  ${breakpointsMedia({
    md: {
      margin: '64px 0',
    },
  })}

  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: contain;

    ${breakpointsMedia({
      sm: {
        width: '125px',
        height: '125px',
      },
      md: {
        width: '150px',
        height: '150px',
      },
      lg: {
        width: '200px',
        height: '200px',
      },
    })}
  }
  
  div {
    margin-left: 4rem;
  }

  h2 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
  }
`;

const PostCard = styled(Grid.Column)`
  position: relative;
  font-size: 0;
  // padding: 16px;


  &::before {
    // element to ensure the PostCard will have a 1:1 ratio
    content: '';
    font-size: 0;
    float: left;
    padding-top: 100%;
  }
`;

const PostLikeButton = styled(Button)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  width: 100%;
  opacity: 0;
  border-radius: 0;
  color: initial;
  transition: 400ms;

  &:hover, &:focus {
    opacity: 0.75;
  }
`;

export default function ProfileScreen({ user, posts }) {
  return (
    <Grid.Container
      flex={1}
    >
      <Grid.Row>
        <Grid.Column
          value={{
            xs: 12,
            md: 9,
          }}
          offset={{
            xs: 0,
            md: 3,
          }}
        >
          <UserCard>
            <img src="https://picsum.photos/200" alt="Avatar" />
            <div>
              <Text
                tag="h2"
                variant="titleXS"
              >
                {posts.length}
              </Text>
              <Text
                tag="p"
              >
                Publicações
              </Text>
              <Text
                tag="h2"
                variant="titleXS"
              >
                {user.name}
              </Text>
              <Text
                tag="p"
              >
                {user.username}
              </Text>
            </div>
          </UserCard>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row
        as="section"
      >
        {posts.map((post, index) => (
          <PostCard
            value={{ xs: 4, md: 3 }}
            offset={{
              xs: 0,
              md: (index === 0 || index % 3 === 0) ? 1.5 : 0,
            }}
            // eslint-disable-next-line no-underscore-dangle
            key={post._id}
          >
            <PostImage loading="lazy" src={post.photoUrl} alt="Imagem do post" />
            <PostLikeButton>
              <img src="/icons/heart.svg" alt="Heart post" />
              <Text
                tag="span"
                variant="subTitle"
              >
                {post.likes.length}
              </Text>
            </PostLikeButton>
          </PostCard>
        ))}
      </Grid.Row>
    </Grid.Container>
  );
}

ProfileScreen.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      photoUrl: PropTypes.string,
      description: PropTypes.string,
      likes: PropTypes.arrayOf(PropTypes.shape({
        user: PropTypes.string,
        _id: PropTypes.string,
      })),
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      __v: PropTypes.number,
    }).isRequired,
  ).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
};
