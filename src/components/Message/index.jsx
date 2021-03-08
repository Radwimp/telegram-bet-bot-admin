import React, { useState } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CardActionArea,
  IconButton,
  CardActions,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DropzoneDialog } from 'material-ui-dropzone';
import axios from 'axios';
import getBaseUrl from '../../common/utils/getBaseUrl';

const Message = () => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [open, setOpen] = useState(false);

  const uploadImage = async files => {
    try {
      const [file] = files;
      const data = new FormData();
      data.append('file', file);
      data.append('imageName', file.name);
      setImage(URL.createObjectURL(file));
      setImageName(file?.name);

      await axios.post(`${getBaseUrl()}/static/uploadImage`, data);
    } catch (e) {
      console.error('Error in uploading file', e);
    }
    setOpen(false);
  };

  const sendMessage = async text => {
    try {
      await axios.post(`${getBaseUrl()}/users/sendMessage`, {
        message: text,
        image: imageName,
      });
    } catch (e) {
      console.error('Error in sending message', e);
    }
  };

  return (
    <>
      <Grid item>
        <Typography variant="h5">
          <b>Send Message</b>
        </Typography>
      </Grid>
      <Grid item>
        {image ? (
          <Card>
            <CardActionArea>
              <img src={image} width="100%" />
            </CardActionArea>
            <CardActions>
              <IconButton onClick={() => setImage(null)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add Image
          </Button>
        )}

        <DropzoneDialog
          filesLimit={1}
          acceptedFiles={['image/*']}
          cancelButtonText="cancel"
          submitButtonText="submit"
          open={open}
          onClose={() => setOpen(false)}
          onSave={uploadImage}
        />
      </Grid>
      <Grid item>
        <Typography>
          <span>
            Сделать жирным - обернуть в {'<'}b{'>'}text{'<'}/b{'> => '}
            <b>text</b>
            <br />
            Сделать курсивом - обернуть в {'<'}i{'>'}text{'<'}/i{'> => '}
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
          error={message.length > (image ? 1024 : 4096)}
          helperText={
            message.length > (image ? 1024 : 4096) && 'Превышен лимит символов'
          }
          rows={6}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => sendMessage(message, image)}
        >
          Send message
        </Button>
      </Grid>
    </>
  );
};

export default Message;
