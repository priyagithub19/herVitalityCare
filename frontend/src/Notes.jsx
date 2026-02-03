import * as React from 'react';
import { Box, Button, Typography } from "@mui/material";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import ModalClose from '@mui/joy/ModalClose';
import Tooltip from '@mui/joy/Tooltip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from "axios";

const API_BASE = "http://localhost:5000/api";



const allEmojis = [
  // Faces & Expressions
  "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😉", "😊", "😇",
  "🥰", "😍", "🤩", "😘", "😗", "☺️", "😚", "😙", "🥲", "😏",
  "😋", "😛", "😜", "🤪", "😝", "🤑",
  "🤗", "🤭", "🫢", "🫣", "🤫", "🤔", "🫡", "🤤",
  "🤠", "🥳", "🥸", "😎", "🤓", "🧐",
  "🙃", "🫠", "🤐", "🤨", "😐", "😑", "😶", "🫥", "😶‍🌫️", "😒", "🙄", "😬", "😮‍💨", "🤥",
  "😌", "😔", "😪", "😴", "🫩",
  "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🥱",
  "😕", "🫤", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺", "🥹",
  "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱",
  "😖", "😣", "😞", "😓", "😩", "😫", "😤", "😡", "😠", "🤬",

  // Hands & Gestures
  "✌️", "🤞", "🤟", "🤘", "👌", "🤌", "👍", "👎",
  "👊", "✊", "🤛", "🤜",
  "👏", "🙌", "👐", "🤲",
  "🙏", "👋", "🤚", "🖐️", "✋",
  "👉", "👈", "👆", "👇",
  "💪", "🫶", "🤝", "🫰",

  // Costume, Creatures & Fun
  "😈", "👿", "💀", "☠️", "💩", "🤡", "👹", "👺",
  "👻", "👽", "👾", "🤖",
  "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾",
  "🙈", "🙉", "🙊",

  // Popular / Mixed emojis
  "🍻", "🔥", "🌈", "☀️", "🎈", "🌹", "💄", "🎀",
  "⚽", "🎾", "🏁", "🐻", "🐶", "🐬", "🐟", "🍀",
  "👀", "🚗", "🍎", "💝", "💙", "❤", "💩",
  "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶",
  "👠", "🏈", "⚾", "🏆", "🐵", "🐮", "🐩",
  "🐎", "💣", "👃", "👂", "🍓", "💘", "💜",
  "💋", "🙏", "🚽", "💃", "💎", "🚀", "🌙",
  "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰",
  "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫",
  "👄", "🚲", "🍉", "💛", "💚"
];


const bookMark = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162z"></path></svg>
const emojiIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 128 128"><radialGradient id="SVGUffsdexK" cx={63.6} cy={-2088.9} r={56.96} gradientTransform="matrix(1 0 0 -1 0 -2026)" gradientUnits="userSpaceOnUse"><stop offset={0.5} stopColor="#fde030"></stop><stop offset={0.919} stopColor="#f7c02b"></stop><stop offset={1} stopColor="#f4a223"></stop></radialGradient><path fill="url(#SVGUffsdexK)" d="M63.6 118.8c-27.9 0-58-17.5-58-55.9S35.7 7 63.6 7c15.5 0 29.8 5.1 40.4 14.4c11.5 10.2 17.6 24.6 17.6 41.5s-6.1 31.2-17.6 41.4c-10.6 9.3-25 14.5-40.4 14.5"></path><path fill="#eb8f00" d="M111.49 29.67c5.33 8.6 8.11 18.84 8.11 30.23c0 16.9-6.1 31.2-17.6 41.4c-10.6 9.3-25 14.5-40.4 14.5c-18.06 0-37.04-7.35-48.18-22.94c10.76 17.66 30.99 25.94 50.18 25.94c15.4 0 29.8-5.2 40.4-14.5c11.5-10.2 17.6-24.5 17.6-41.4c0-12.74-3.47-24.06-10.11-33.23"></path><radialGradient id="SVGzZYR4b0V" cx={25.701} cy={68.023} r={19.444} gradientTransform="matrix(.9791 0 0 .9301 2.087 8.56)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#ed7770"></stop><stop offset={0.9} stopColor="#ed7770" stopOpacity={0}></stop></radialGradient><circle cx={27.25} cy={71.83} r={17.5} fill="url(#SVGzZYR4b0V)" opacity={0.8}></circle><radialGradient id="SVGLCOnXcrC" cx={100.771} cy={68.023} r={19.444} gradientTransform="matrix(.9791 0 0 .9301 2.087 8.56)" gradientUnits="userSpaceOnUse"><stop offset={0} stopColor="#ed7770"></stop><stop offset={0.9} stopColor="#ed7770" stopOpacity={0}></stop></radialGradient><circle cx={100.75} cy={71.83} r={17.5} fill="url(#SVGLCOnXcrC)" opacity={0.8}></circle><path fill="#422b0d" d="M48.96 56.89s-.05-.07-.16-.2l-.42-.54q-.225-.24-.54-.57c-.21-.24-.47-.49-.73-.75c-.27-.25-.55-.51-.84-.72c-.28-.23-.59-.4-.84-.54c-.26-.16-.5-.2-.65-.25c-.08-.03-.15-.03-.21-.04c-.03.01-.06-.01-.09 0l-.04.01h-.03c.12 0-.27.01.27-.01l-.55.02c-.14 0-.05.01-.04.01c.03 0 .05 0 .07-.01c.08-.03 0 0-.02 0a.3.3 0 0 0-.11.03c-.16.05-.4.09-.65.25c-.25.14-.56.31-.84.54c-.28.22-.57.47-.84.72c-.52.51-.98 1.02-1.3 1.39c-.33.38-.51.6-.51.6l-.23.27c-1.37 1.6-3.89 1.87-5.62.61c-1.18-.86-1.69-2.2-1.47-3.48c0 0 .07-.41.27-1.12c.21-.71.56-1.72 1.25-2.91c.69-1.18 1.69-2.57 3.38-3.84c.83-.62 1.84-1.24 3.04-1.66c.29-.11.6-.21.92-.29c.33-.08.59-.17 1.04-.23l.62-.09c.19-.02.47-.05.51-.05l.55-.04l.31-.01h.09l.13.01h.24l.51.03c.34.03.67.09 1 .14c.65.12 1.3.29 1.89.51a11.1 11.1 0 0 1 3.04 1.66c1.69 1.27 2.69 2.66 3.38 3.84c.35.59.61 1.15.8 1.64c.21.47.36.97.48 1.34c.11.36.11.55.16.72c.03.16.04.25.04.25c.37 2.02-1.12 3.93-3.31 4.26c-1.57.25-3.08-.38-3.95-1.5m39.5 0s-.05-.07-.16-.2l-.42-.54q-.225-.24-.54-.57c-.21-.24-.47-.49-.73-.75c-.27-.25-.55-.51-.84-.72c-.28-.23-.59-.4-.84-.54c-.26-.16-.5-.2-.65-.25c-.08-.03-.15-.03-.21-.04c-.03.01-.06-.01-.09 0l-.04.01h-.04c.12 0-.27.01.27-.01l-.55.02c-.14 0-.05.01-.04.01c.03 0 .05 0 .07-.01c.08-.03 0 0-.02 0a.3.3 0 0 0-.11.03c-.16.05-.4.09-.65.25c-.25.14-.56.31-.84.54c-.28.22-.57.47-.84.72c-.52.51-.98 1.02-1.3 1.39c-.33.38-.51.6-.51.6l-.23.27c-1.37 1.6-3.89 1.87-5.62.61c-1.18-.86-1.69-2.2-1.47-3.48c0 0 .07-.41.27-1.12c.21-.71.56-1.72 1.25-2.91c.69-1.18 1.69-2.57 3.38-3.84c.83-.62 1.84-1.24 3.04-1.66c.29-.11.6-.21.92-.29c.33-.08.59-.17 1.04-.23l.62-.09c.19-.02.47-.05.51-.05l.55-.04l.31-.01h.09l.13.01h.24l.51.03c.34.03.67.09 1 .14c.65.12 1.3.29 1.89.51a11.1 11.1 0 0 1 3.04 1.66c1.69 1.27 2.69 2.66 3.38 3.84c.35.59.61 1.15.8 1.64c.21.47.36.97.48 1.34c.11.36.11.55.16.72c.03.16.04.25.04.25c.37 2.02-1.12 3.93-3.31 4.26c-1.57.25-3.08-.38-3.94-1.5m-24.44 37.1c-12.57 0-22.51-5.95-27.99-12.32c-.55-.64-.68-1.5-.33-2.25c.35-.77 1.11-1.27 1.93-1.27c.37 0 .75.1 1.08.29c5.65 3.26 15.14 7.29 25.28 7.29h.16c10.15 0 19.63-4.04 25.28-7.29c.34-.19.71-.3 1.08-.29c.82 0 1.58.5 1.93 1.27c.34.75.22 1.62-.33 2.25c-5.48 6.36-15.43 12.32-27.99 12.32"></path></svg>
const del = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>

export default function Notes({ userId, cycleId }) {

  const [italic, setItalic] = React.useState(false);
  const [bold, setBold] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [emojiActive, setEmojiActive] = React.useState(false);
  const [note, setNote] = React.useState(null);
  const [notes, setNotes] = React.useState([]);
  const today = new Date();
  const date = today.getDate() + '/' + (today.toLocaleString('default', { month: 'short' })) + '/' + today.getFullYear();


  useEffect(() => {
    if (!userId || !cycleId ) return;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/day/${userId}/${cycleId}/${dayNumber}`
        );

        setNotes(res.data || []);
      } catch (err) {
        console.error("Failed to load notes", err);
      }
    };

    fetchNotes();
  }, [userId, cycleId]);

const saveNote = async () => {
    if (!note.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE}/day`, {
        userId,
        cycleId,
        dayNumber,
        date: new Date(),
        notes: note,
      });

      setNotes((prev) => [...prev, res.data]);
      setNote("");
      setOpen(false);
    } catch (err) {
      console.error("Save note failed", err);
      alert("Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE}/day/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete note failed", err);
    }
  };

  

  const Note = ({ note }) => {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          my: 5,
          backgroundColor: 'rgba(226, 141, 176, 0.2)',
          width: '25rem',
          overflowWrap: 'break-word',
          position: 'relative'
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#8a0047',
            fontWeight: 600,
            position: 'absolute',
            top: 3,
            right: 0,
            mr: 1,
            mt: 1
          }}
        >
          - {note.date}
        </Typography>

        <Typography sx={{ whiteSpace: 'pre-wrap', mt: 2 }}>
          {note.text}
        </Typography>

        <IconButton
          sx={{ position: 'absolute', right: 0, bottom: 1 }}
          onClick={() => deleteNote(note.id)}
        >
          {del}
        </IconButton>
      </Paper>
    );
  };


  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 600 }}>
        Notes
      </Typography>
      <Box sx={{ mx: 2, p: 2, display: 'flex', justifyContent: 'center' }}>
        {notes.length > 0 ? (
          <Box sx={{ p: 2 }}>
            <ImageList variant="masonry" cols={3} gap={12}>
              {notes.map((note) => (
                <ImageListItem key={note.id}>
                  <Note note={note} />
                </ImageListItem>
              ))}
            </ImageList>

          </Box>

        ) : (
          <Typography variant='body1'>
            Notes are not available.
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button sx={{ backgroundColor: '#E28DB0', color: '#8a0030', fontWeight: 600, borderRadius: 4, px: 2 }} onClick={() => setOpen(true)}>+ Add notes</Button>
      </Box>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}
      >
        <Sheet
          variant="outlined"
          sx={{ width: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            // textColor="inherit"
            sx={{ fontWeight: 570, mb: 1 }}
          >
            Add New
          </Typography>
          <Typography id="modal-desc" sx={{ mb: 1, color: '#E58DC1', fontWeight: 600 }}>
            Leave yourself a gentle reminder. Note to self! ✨
          </Typography>
          <Box>
            <FormControl>
              <FormLabel sx={{ color: '#8a0047' }}>Write something you’ll want later.</FormLabel>
              <Textarea
                placeholder="Type here… How you are feeling today?.. What are your thoughts?..."
                minRows={10}
                onChange={(e) => setNote(e.target.value)}
                value={note}
                endDecorator={
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 'var(--Textarea-paddingBlock)',
                        pt: 'var(--Textarea-paddingBlock)',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        flex: 'auto',
                      }}
                    >
                      <IconButton
                        variant="plain"
                        color="neutral"
                        aria-pressed={bold}
                        onClick={() => setBold((bool) => !bool)}
                      >
                        <FormatBold />
                      </IconButton>
                      <IconButton
                        variant={italic ? 'soft' : 'plain'}
                        color={italic ? 'primary' : 'neutral'}
                        aria-pressed={italic}
                        onClick={() => setItalic((bool) => !bool)}
                      >
                        <FormatItalic />
                      </IconButton>
                      <IconButton
                        variant={emojiActive ? 'soft' : 'plain'}
                        color={emojiActive ? 'primary' : 'neutral'}
                        aria-pressed={emojiActive}
                        onClick={() => setEmojiActive((bool) => !bool)}
                      >
                        {emojiIcon}
                      </IconButton>
                      <Tooltip title="Save Note" placement="bottom" variant="soft" color="warning" sx={{ fontWeight: 600, color: '#8a0047', px: 2 }}>
                        <Button sx={{ position: 'absolute', right: 0, color: '#8a0047' }} onClick={saveNote}>{bookMark}</Button>
                      </Tooltip>
                      <Box sx={{ width: '50%', overflowX: 'auto', display: emojiActive ? 'flex' : 'none', border: '1px solid #ccc', borderRadius: 2, p: 1, flexWrap: 'wrap', gap: 1, backgroundColor: '#fff', height: 150, scrollbarWidth: 'thin' }}>
                        {allEmojis.map((emoji, index) =>
                          <IconButton
                            key={index}
                            sx={{ backgroundColor: 'rgb(204, 204, 204, 0.3)' }}
                            onClick={() => setNote((prev) => (prev ? prev + " " : "") + emoji)}
                          >
                            {emoji}
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </Box>
                }
                sx={[
                  {
                    minWidth: 300,
                    fontWeight: bold ? 'bold' : 'normal',
                    fontStyle: italic ? 'italic' : 'initial',
                    whiteSpace: 'pre-wrap',
                  },
                ]}
              />
            </FormControl>
          </Box>


        </Sheet>
      </Modal>
    </Box>
  )
}

