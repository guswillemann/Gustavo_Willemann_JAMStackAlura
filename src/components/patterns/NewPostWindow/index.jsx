/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button, { IconButton } from '../../commons/Button';
import TextField from '../../forms/TextField';
import Text from '../../foundation/Text';
import { WebsitePageContext } from '../../wrappers/WebsitePage/context';
import Box from '../../foundation/layout/Box';
import PostImage from '../../commons/PostImage';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';

const NewPostWrapper = styled.section`
  position: relative;
  overflow-y: scroll;

  width: 375px;
  max-width: 100vw;
  border-radius: ${({ theme }) => theme.borderRadius};

  ${breakpointsMedia({
    md: css`
      overflow-y: initial;
    `,
  })}

  align-self: center;
  background-color: ${({ theme }) => theme.colors.background.light.color};
  padding: 56px 0 32px 0;

  form {
    position: relative;
    margin-top: 48px;
    padding-right: 24px;
    padding-left: 24px;

    button {
      font-size: 0;
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 24px;
      padding: 12px;
    }
    
    p {
      color: ${({ theme }) => theme.colors.tertiary.light.color}
    }
  }
`;

function ImageUrlForm({ urlString, setUrlString, setImgSrc }) {
  function handleChange(event) {
    const { value } = event.target;
    setUrlString(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setImgSrc(urlString);
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <TextField
        name="url"
        placeholder="URL da Imagem"
        onChange={handleChange}
        value={urlString}
        padding="13px 16px"
        type="url"
      />
      <Button
        type="submit"
        variant="secondary.main"
        padding="12px 12px"
      >
        <img src="/icons/arrow-right.svg" alt="Selecionar Imagem" />
      </Button>

      <Text
        tag="p"
        textAlign="center"
        variant="paragraph2"
        marginBottom="38px"
      >
        Formatos suportados: jpg, png, svg, xpto.
      </Text>
    </form>
  );
}

ImageUrlForm.propTypes = {
  urlString: PropTypes.string.isRequired,
  setUrlString: PropTypes.func.isRequired,
  setImgSrc: PropTypes.func.isRequired,
};

const filterOptionsArray = [
  { name: 'Normal', classString: '' },
  { name: '1977', classString: 'filter-1977' },
  { name: 'Aden', classString: 'filter-aden' },
  { name: 'Amaro', classString: 'filter-amaro' },
  { name: 'Ashby', classString: 'filter-ashby' },
  { name: 'Brannan', classString: 'filter-brannan' },
  { name: 'Brooklyn', classString: 'filter-brooklyn' },
  { name: 'Charmes', classString: 'filter-charmes' },
  { name: 'Clarendon', classString: 'filter-clarendon' },
  { name: 'Crema', classString: 'filter-crema' },
  { name: 'Dogpatch', classString: 'filter-dogpatch' },
  { name: 'Earlybird', classString: 'filter-earlybird' },
  { name: 'Gingham', classString: 'filter-gingham' },
  { name: 'Ginza', classString: 'filter-ginza' },
  { name: 'Hefe', classString: 'filter-hefe' },
  { name: 'Helena', classString: 'filter-helena' },
  { name: 'Hudson', classString: 'filter-hudson' },
  { name: 'Inkwell', classString: 'filter-inkwell' },
  { name: 'Kelvin', classString: 'filter-kelvin' },
  { name: 'Juno', classString: 'filter-juno' },
  { name: 'Lark', classString: 'filter-lark' },
  { name: 'Lo-Fi', classString: 'filter-lofi' },
  { name: 'Ludwig', classString: 'filter-ludwig' },
  { name: 'Maven', classString: 'filter-maven' },
  { name: 'Mayfair', classString: 'filter-mayfair' },
  { name: 'Moon', classString: 'filter-moon' },
  { name: 'Nashville', classString: 'filter-nashville' },
  { name: 'Perpetua', classString: 'filter-perpetua' },
  { name: 'Poprocket', classString: 'filter-poprocket' },
  { name: 'Reyes', classString: 'filter-reyes' },
  { name: 'Rise', classString: 'filter-rise' },
  { name: 'Sierra', classString: 'filter-sierra' },
  { name: 'Skyline', classString: 'filter-skyline' },
  { name: 'Slumber', classString: 'filter-slumber' },
  { name: 'Stinson', classString: 'filter-stinson' },
  { name: 'Sutro', classString: 'filter-sutro' },
  { name: 'Toaster', classString: 'filter-toaster' },
  { name: 'Valencia', classString: 'filter-valencia' },
  { name: 'Vesper', classString: 'filter-vesper' },
  { name: 'Walden', classString: 'filter-walden' },
  { name: 'Willow', classString: 'filter-willow' },
  { name: 'X-Pro II', classString: 'filter-xpro-ii' },
];

const FilterOptionsWrapper = styled.div`
  position: relative;

  width: 100%;
  display: flex;
  margin: 24px 0;
  overflow-x: scroll;

  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::before, &::after  {
    content: '';
    padding-right: 16px;
  }
`;

const OptionButton = styled(Button)`
  height: max-content;
  padding: 0px;
  margin: 0 8px;
  
  transition: background-color 500ms;

  ${({ theme, selected }) => (selected && css`
    background-color: ${theme.colors.primary.main.color};
    color: ${theme.colors.primary.main.contrastText};
  `)}
`;

function FilterOptions({ setFilterClass, imgSrc }) {
  const [selectedFilter, setSelectedFilter] = useState('');

  function handleClick(filterClassString, filterName) {
    setFilterClass(filterClassString);
    setSelectedFilter(filterName);
  }

  return (
    <FilterOptionsWrapper>
      {filterOptionsArray.map((filter) => (
        <OptionButton
          key={filter.name}
          name={filter.name}
          onClick={() => handleClick(filter.classString, filter.name)}
          selected={selectedFilter === filter.name}
          ghost
        >
          <PostImage imgSrc={imgSrc} filterClass={filter.classString} alt="Preview do filtro" width="88px" />
          <Text
            tag="p"
            margin="6px 0"
          >
            {filter.name}
          </Text>
        </OptionButton>
      ))}
    </FilterOptionsWrapper>
  );
}

FilterOptions.propTypes = {
  setFilterClass: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

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

export default function NewPostWindow() {
  const { modalProps, toggleModal } = useContext(WebsitePageContext);

  const [imgSrc, setImgSrc] = useState('');
  const [urlString, setUrlString] = useState('');
  const [isSelectingFilter, setIsSelectingFilter] = useState(false);
  const [filterClass, setFilterClass] = useState(undefined);

  const isDisabled = !imgSrc || (isSelectingFilter && filterClass === undefined);

  function completeNewPost() {
    console.log(`Imagem postada. Filtro: ${filterClass}`);
  }

  function handleClick() {
    if (isSelectingFilter) completeNewPost();
    else setIsSelectingFilter(true);
  }

  function onBack() {
    setIsSelectingFilter(false);
    setFilterClass(undefined);
  }

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      flex="1"
    >
      <Head>
        <link rel="stylesheet" href="/instagram.min.css" />
      </Head>
      <NewPostWrapper
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...modalProps}
      >
        {isSelectingFilter && <BackButton type="button" onClick={onBack}><img src="/icons/arrow-right-dark.svg" alt="Voltar" /></BackButton>}
        <CloseButton type="button" onClick={() => toggleModal()}><img src="/icons/xIcon.svg" alt="Fechar" /></CloseButton>

        <PostImage imgSrc={imgSrc} filterClass={filterClass} alt="Imagem escolhida" />

        {isSelectingFilter
          ? (
            <FilterOptions
              imgSrc={imgSrc}
              setFilterClass={setFilterClass}
            />
          )
          : (
            <ImageUrlForm
              urlString={urlString}
              setUrlString={setUrlString}
              setImgSrc={setImgSrc}
            />
          )}

        <Box
          padding="0 24px"
        >
          <Button
            variant="primary.main"
            fullWidth
            onClick={handleClick}
            disabled={isDisabled}
            type="button"
          >
            {isSelectingFilter ? 'Postar' : 'Avançar'}
          </Button>
        </Box>
      </NewPostWrapper>
    </Box>
  );
}
