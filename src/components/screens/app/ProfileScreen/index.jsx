/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '../../../foundation/layout/Grid';
import Button from '../../../commons/Button';
import PostImage from '../../../commons/PostImage';
import Text from '../../../foundation/Text';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';
import useWebsitePageContext from '../../../wrappers/WebsitePage/context';
import UserCard from './UserCard';

const PostCard = styled(Grid.Column)`
  position: relative;
  font-size: 0;
  margin-bottom: 8px;
  padding: 0 4px;

  ${breakpointsMedia({
    lg: {
      marginBottom: '32px',
      padding: '0 16px',
    },
  })}
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
  const { newPost } = useWebsitePageContext();
  const [postList, setPostList] = useState(posts);

  useEffect(() => {
    if (!newPost) return undefined;
    // eslint-disable-next-line no-underscore-dangle
    if (newPost._id !== postList[0]._id) setPostList([newPost, ...postList]);
    return undefined;
  }, [newPost]);

  return (
    <Grid.Container
      flex={1}
    >
      <Grid.Row>
        <Grid.Column
          value={{
            xs: 12,
            sm: 8,
            md: 9,
            lg: 7,
          }}
          offset={{
            xs: 0,
            sm: 2,
            md: 1.5,
            lg: 2.5,
          }}
        >
          <UserCard
            user={{
              name: user.name,
              username: user.username,
              avatar: user.avatar,
              followers: user.followers,
              following: user.following,
            }}
            numberOfPosts={posts.length}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row
        as="section"
      >
        {postList.map((post, index) => (
          <PostCard
            value={{ xs: 4, md: 3 }}
            offset={{
              xs: 0,
              md: (index === 0 || index % 3 === 0) ? 1.5 : 0,
            }}
            // eslint-disable-next-line no-underscore-dangle
            key={post._id}
          >
            <PostImage
              imgSrc={post.photoUrl}
              filterClass={post.filter}
              alt="Imagem do post"
            />
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
    }),
  ).isRequired,

  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    role: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
  }).isRequired,
};
