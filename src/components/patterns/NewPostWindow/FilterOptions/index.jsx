import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import PostImage from '../../../commons/PostImage';
import Text from '../../../foundation/Text';
import Button from '../../../commons/Button';
import filterOptionsData from './filterOptionsData';

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

export default function FilterOptions({ setFilterClass, imgSrc }) {
  const [selectedFilter, setSelectedFilter] = useState('');

  function handleClick(filterClassString, filterName) {
    setFilterClass(filterClassString);
    setSelectedFilter(filterName);
  }

  return (
    <FilterOptionsWrapper>
      {filterOptionsData.map((filter) => (
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
