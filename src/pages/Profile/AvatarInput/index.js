import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';
import { Container } from './styles';

export default function AvatarInput() {
  //crio um ref para pegar a tag do html, no caso vai ser o input de envio de arquivo.
  const ref = useRef();

  //avatar redux user
  const { defaultValue, registerField } = useField('avatar');

  //id avatar
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  //preview avatar
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  //cadastrar avatar e setar na tela
  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/40/abott@adorable.png'
          }
          alt="avatar_profile"
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
