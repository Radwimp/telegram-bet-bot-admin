import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import axios from 'axios';
import getBaseUrl from '../../common/utils/getBaseUrl';

const Message = () => {
  const [value, setValue] = useState();
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);

  const sendMessage = (message, image) => {
    axios
      .post(`${getBaseUrl()}/users/sendMessage`, {
        message,
        image,
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
            Сделать жирным - обернуть в &lt;b&gt;text&lt;/b&gt; => <b>text</b>
            <br />
            Сделать курсивом - обернуть в &lt;i&gt;text&lt;/i&gt; => <i>text</i>
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
          acceptedFiles={['image/*']}
          cancelButtonText="cancel"
          submitButtonText="submit"
          maxFileSize={5000000}
          open={open}
          onClose={() => setOpen(false)}
          onSave={files => {
            console.log('Files:', files);
            setOpen(false);
          }}
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
