import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../commons/Button';
import TextField from '../../../forms/TextField';
import Text from '../../../foundation/Text';

export default function ImageUrlForm({ imgSrc, setImgSrc }) {
  const [urlString, setUrlString] = useState(imgSrc);

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
        padding="13px 50px 13px 16px"
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
  imgSrc: PropTypes.string.isRequired,
  setImgSrc: PropTypes.func.isRequired,
};
