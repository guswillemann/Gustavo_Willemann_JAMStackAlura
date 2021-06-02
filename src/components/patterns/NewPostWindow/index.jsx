/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button, { IconButton } from '../../commons/Button';
import useWebsitePageContext from '../../wrappers/WebsitePage/context';
import Box from '../../foundation/layout/Box';
import PostImage from '../../commons/PostImage';
import NewPostWrapper from './NewPostWrapper';
import ImageUrlForm from './ImageUrlForm';
import FilterOptions from './FilterOptions';
import userService from '../../../services/user/userService';
import Text from '../../foundation/Text';

const BackButton = styled(IconButton)`
  position: absolute;
  top: 12px;
  left: 12px;
  transform: rotate(180deg);
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const ErrorMessage = styled(Text)`
  text-align: center;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
`;

const postStates = {
  imgSelection: 'imgSelection',
  filterSelection: 'filterSelection',
  posting: 'posting',
};

const postStatesSteps = Object.keys(postStates);
const lastStep = postStatesSteps.length - 2;

export default function NewPostWindow() {
  const {
    modalProps,
    toggleModal,
    setNewPost,
    resetModalContent,
  } = useWebsitePageContext();

  const [postState, setPostState] = useState(postStates.imgSelection);
  const [imgSrc, setImgSrc] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const errorMessage = useRef('');

  useEffect(() => {
    errorMessage.current = '';
  }, [postState]);

  const isDisabled = (postState === postStates.imgSelection && !imgSrc)
    || (postState === postStates.filterSelection && !filterClass);

  const isImgSelection = postState === postStates.imgSelection;
  const isFilterSelection = postState === postStates.filterSelection;
  const isPosting = postState === postStates.posting;
  const hasError = Boolean(errorMessage.current);

  async function completeNewPost() {
    setPostState(postStates.posting);
    await userService.sendNewPost({
      photoUrl: imgSrc,
      description: 'Post Description',
      filter: filterClass,
    })
      .then((post) => {
        setNewPost(post);
        resetModalContent();
      })
      .catch(() => {
        errorMessage.current = 'Não foi possível criar o post.';
        setPostState(postStatesSteps[lastStep]);
      });
  }

  function onNext() {
    const postNewStateIndex = postStatesSteps.indexOf(postState) + 1;
    if (postState === postStatesSteps[lastStep]) completeNewPost();
    else setPostState(postStatesSteps[postNewStateIndex]);
  }

  function onBack() {
    const postNewStateIndex = postStatesSteps.indexOf(postState) - 1;
    switch (postState) {
      case (postStates.filterSelection): {
        setFilterClass('');
        setPostState(postStatesSteps[postNewStateIndex]);
        break;
      }
      default: setPostState(postStatesSteps[postNewStateIndex]);
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      flex="1"
    >
      <NewPostWrapper
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...modalProps}
      >
        {!(isImgSelection || isPosting) && (
          <BackButton type="button" onClick={onBack}>
            <img src="/icons/arrow-right-dark.svg" alt="Voltar" />
          </BackButton>
        )}

        <CloseButton type="button" onClick={() => toggleModal()}>
          <img src="/icons/xIcon.svg" alt="Fechar" />
        </CloseButton>

        <PostImage imgSrc={imgSrc} filterClass={filterClass} alt="Imagem escolhida" />

        {isImgSelection && (
          <ImageUrlForm
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
          />
        )}

        {(isFilterSelection || isPosting) && (
          <FilterOptions
            imgSrc={imgSrc}
            filterClass={filterClass}
            setFilterClass={setFilterClass}
          />
        )}

        <Box
          padding="0 24px"
        >
          <Button
            variant="primary.main"
            fullWidth
            onClick={onNext}
            disabled={isDisabled}
            type="button"
          >
            {isFilterSelection ? 'Postar' : 'Avançar'}
          </Button>

          {hasError && (
            <ErrorMessage
              color="error.main"
            >
              {errorMessage.current}
            </ErrorMessage>
          )}
        </Box>
      </NewPostWrapper>
    </Box>
  );
}
