import React, { useState } from 'react';
import styled from 'styled-components';
import HttpClient from '../../../infra/http/HttpClient';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';

const MagnifyingGlass = styled(Button)`
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(50%, -50%);
  font-size: 0;
  padding: 0;
`;

const BASE_URL = 'https://instalura-api.vercel.app';

export default function FormSearch() {
  const [searchValue, setSearchValue] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    const url = `${BASE_URL}/api/users`;
    HttpClient(url, {})
      .then((res) => res.data.filter((user) => {
        const searchRegExp = new RegExp(searchValue);
        return searchRegExp.test(user.username);
      }))
      // eslint-disable-next-line no-console
      .then((users) => console.log(users));
  }

  function handleChange(event) {
    const { value } = event.target;
    setSearchValue(value);
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={{ position: 'relative' }}>
        <TextField
          name="search"
          placeholder="Pesquisar"
          value={searchValue}
          onChange={handleChange}
          isSearchBox
        />
        <MagnifyingGlass type="submit">
          <img src="/icons/search.svg" alt="Lupa" />
        </MagnifyingGlass>
      </div>
    </form>
  );
}
