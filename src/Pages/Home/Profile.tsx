import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Settings as SettingsIcon,
  Favorite as FavoriteIcon,
  WatchLater as WatchLaterIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          User not found
        </Typography>
      </Box>
    );
  }

  const handleEdit = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSave = () => {
    if (editedUser) {
      updateUser(editedUser);
      setIsEditing(false);
      setShowSuccess(true);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (editedUser) {
      if (field === 'notifications' || field === 'theme') {
        setEditedUser({
          ...editedUser,
          preferences: {
            ...editedUser.preferences,
            [field]: value
          }
        });
      } else {
        setEditedUser({
          ...editedUser,
          [field]: value
        });
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.primary.main }}>
        Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PersonIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Personal Information
              </Typography>
              {!isEditing ? (
                <IconButton onClick={handleEdit} color="primary">
                  <EditIcon />
                </IconButton>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={handleSave} color="primary">
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancel} color="error">
                    <CancelIcon />
                  </IconButton>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  value={isEditing ? editedUser?.username || '' : user.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={isEditing ? editedUser?.email || '' : user.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Avatar Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
            <Avatar
              src={user.avatar}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                fontSize: '48px',
                fontWeight: 'bold',
                bgcolor: theme.palette.primary.main
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member since {new Date().getFullYear()}
            </Typography>
          </Paper>
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <SettingsIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Typography variant="h6">
                Preferences
              </Typography>
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={isEditing ? editedUser?.preferences.notifications : user.preferences.notifications}
                  onChange={(e) => handleInputChange('notifications', e.target.checked)}
                  disabled={!isEditing}
                />
              }
              label="Email Notifications"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              select
              label="Theme"
              value={isEditing ? editedUser?.preferences.theme : user.preferences.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </TextField>

            <TextField
              fullWidth
              label="Language"
              value={isEditing ? editedUser?.preferences.language : user.preferences.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              disabled={!isEditing}
            />
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Your Activity
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card sx={{ textAlign: 'center', bgcolor: theme.palette.primary.main + '10' }}>
                  <CardContent>
                    <FavoriteIcon sx={{ color: theme.palette.primary.main, fontSize: 32, mb: 1 }} />
                    <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                      {user.favorites.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Favorites
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ textAlign: 'center', bgcolor: theme.palette.secondary.main + '10' }}>
                  <CardContent>
                    <WatchLaterIcon sx={{ color: theme.palette.secondary.main, fontSize: 32, mb: 1 }} />
                    <Typography variant="h4" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>
                      {user.watchlist.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Watchlist
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ textAlign: 'center', bgcolor: theme.palette.success.main + '10' }}>
                  <CardContent>
                    <HistoryIcon sx={{ color: theme.palette.success.main, fontSize: 32, mb: 1 }} />
                    <Typography variant="h4" sx={{ color: theme.palette.success.main, fontWeight: 'bold' }}>
                      {user.watchHistory.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Watched
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
export { Profile }; 