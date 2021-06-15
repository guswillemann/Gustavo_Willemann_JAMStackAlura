/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Grid from '../../../foundation/layout/Grid';
import PostImage from '../../../commons/PostImage';
import breakpointsMedia from '../../../../theme/utils/breakpointsMedia';
import useWebsitePageContext from '../../../wrappers/WebsitePage/context';
import UserCard from './UserCard';
import PostLikeButton from './PostLikeButton';

const PostCard = styled(Grid.Column)`
  font-size: 0;
  margin-bottom: 8px;
  padding: 0 4px;

  & > div {
    position: relative;
  }

  ${breakpointsMedia({
    lg: {
      marginBottom: '32px',
      padding: '0 16px',
    },
  })}
`;

export default function ProfileScreen({ user, posts }) {
  const { newPost } = useWebsitePageContext();
  const [postList, setPostList] = useState(posts);

  useEffect(() => {
    if (!newPost) return undefined;
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
      <section name="User posts">
        <Grid.Row
          as="ul"
        >
          {postList.map((post, index) => (
            <PostCard
              as="li"
              value={{ xs: 4, md: 3 }}
              offset={{
                xs: 0,
                md: (index === 0 || index % 3 === 0) ? 1.5 : 0,
              }}
              key={post._id}
              data={`description-${post.description}`}
            >
              <div styles={{ width: '100%' }}>
                <PostImage
                  imgSrc={post.photoUrl}
                  filterClass={post.filter}
                  alt="Imagem do post"
                />
                <PostLikeButton
                  postList={postList}
                  post={post}
                  index={index}
                  user={user}
                  setPostList={setPostList}
                />
              </div>
            </PostCard>
          ))}
        </Grid.Row>
      </section>
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
