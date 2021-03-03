import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import axios from 'axios';
import getBaseUrl from '../../common/utils/getBaseUrl';

const Message = () => {
  const [value, setValue] = useState();
  const [image] = useState();
  const [open, setOpen] = useState(false);

  const uploadImage = files => {
    const [file] = files;
    // console.log(file);
    axios
      .post(
        `${getBaseUrl()}/static/uploadImage`,
        {
          imageName: file.name,
          file,
        },
        {
          headers: {
            'Content-Type': file.type,
          },
        },
      )
      .then(console.log);
  };

  const sendMessage = message => {
    axios
      .post(`${getBaseUrl()}/users/sendMessage`, {
        message,
      })
      .then(() => alert('Message sended'));
  };

  return (
    <>
      <Grid item>
        <Typography variant="h5">
          <b>Send Message</b>
        </Typography>
        <Typography variant="h7">
          <span>
            Сделать жирным - обернуть в {'<'}b{'>'}text{'<'}/b{'>'} ={'>'}
            <b>text</b>
            <br />
            Сделать курсивом - обернуть в {'<'}i{'>'}text{'<'}/i{'>'} ={'>'}
            <i>text</i>
          </span>
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          multiline
          rows={6}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add Image
        </Button>

        <DropzoneDialog
          filesLimit={1}
          acceptedFiles={['image/png']}
          cancelButtonText="cancel"
          submitButtonText="submit"
          open={open}
          onClose={() => setOpen(false)}
          onSave={uploadImage}
        />
      </Grid>
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => sendMessage(value, image)}
        >
          Send message
        </Button>
      </Grid>
    </>
  );
};

export default Message;
