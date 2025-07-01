import React, { useState, useRef, useEffect } from 'react';
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
  Card,
  CardContent,
  IconButton,
  useTheme,
  Alert,
  Snackbar,
  Chip,
  LinearProgress,
  Badge,
  Grid,
  Container,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Settings as SettingsIcon,
  Favorite as FavoriteIcon,
  CameraAlt as CameraIcon,
  Palette as PaletteIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  CalendarToday as CalendarIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  CategoryRounded as CategoryRoundedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, isLoading, updateUser, updateAvatar, updateUserPreferences, syncUserData } = useAuth();
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editedUser, setEditedUser] = useState(user);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update editedUser when user changes
  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  // Show loading state while auth is loading
  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          User not found. Please log in again.
        </Typography>
      </Box>
    );
  }

  // Ensure we have safe defaults for all user properties
  const safeUser = {
    ...user,
    favorites: user.favorites || [],
    watchlist: user.watchlist || [],
    preferences: user.preferences || { theme: 'dark', language: 'en', notifications: true },
    avatar: user.avatar || '',
  };

  const handleEdit = () => {
    setEditedUser(safeUser);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(safeUser);
  };

  const handleSave = async () => {
    if (editedUser) {
      try {
        // Update preferences in backend
        await updateUserPreferences({
          theme: editedUser.preferences.theme,
          language: editedUser.preferences.language,
          notifications: editedUser.preferences.notifications,
        });
        
        // Update local state
        updateUser(editedUser);
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully and saved to your account!');
        setShowSuccess(true);
      } catch (error) {
        console.error('Error updating profile:', error);
        setSuccessMessage('Profile updated locally, but failed to save to server.');
        setShowSuccess(true);
      }
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;
      if (result) {
        try {
          await updateAvatar(result);
          setSuccessMessage('Profile picture updated successfully and saved to your account!');
          setShowSuccess(true);
        } catch (error) {
          setSuccessMessage('Profile picture updated locally, but failed to save to server.');
          setShowSuccess(true);
        }
      }
      setUploadingImage(false);
    };
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processImageFile(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSyncData = async () => {
    try {
      await syncUserData();
      setSuccessMessage('Data synced successfully from server!');
      setShowSuccess(true);
    } catch (error) {
      console.error('Error syncing data:', error);
      setSuccessMessage('Failed to sync data from server.');
      setShowSuccess(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stats = [
    {
      title: 'Favorites',
      value: safeUser.favorites.length,
      icon: <FavoriteIcon sx={{ fontSize: 24, color: '#667eea' }} />,
      color: '#667eea',
      max: 100
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      py: 4
    }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 900, 
                  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Profile
              </Typography>
              <Typography variant="h6" sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 400,
                opacity: 0.8
              }}>
                Manage your account and preferences
              </Typography>
            </Box>
          </motion.div>

          {/* Profile Content */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
              {/* Left Column - Profile Info & Stats */}
              <Box sx={{ flex: { lg: 2 } }}>
                {/* Profile Header Card */}
                <motion.div variants={itemVariants}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: { xs: 3, md: 4 }, 
                      mb: 4, 
                      borderRadius: 4,
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Background decoration */}
                    <Box sx={{
                      position: 'absolute',
                      top: -100,
                      right: -100,
                      width: 300,
                      height: 300,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                      opacity: 0.05,
                      zIndex: 0
                    }} />
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', lg: 'row' },
                      alignItems: { xs: 'center', lg: 'flex-start' },
                      gap: 4,
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {/* Avatar Section */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Box
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          sx={{
                            position: 'relative',
                            display: 'inline-block',
                            cursor: 'pointer',
                            '&:hover .upload-overlay': {
                              opacity: 1,
                            }
                          }}
                        >
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <IconButton
                                onClick={triggerFileInput}
                                disabled={uploadingImage}
                                sx={{
                                  backgroundColor: theme.palette.primary.main,
                                  color: 'white',
                                  width: 36,
                                  height: 36,
                                  '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                  },
                                  '&:disabled': {
                                    backgroundColor: theme.palette.action.disabled,
                                  }
                                }}
                              >
                                {uploadingImage ? (
                                  <Box sx={{ 
                                    width: 18, 
                                    height: 18, 
                                    border: '2px solid transparent',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                  }} />
                                ) : (
                                  <CameraIcon sx={{ fontSize: 18 }} />
                                )}
                              </IconButton>
                            }
                          >
                            <Avatar
                              src={safeUser.avatar}
                              sx={{
                                width: 120,
                                height: 120,
                                fontSize: '48px',
                                fontWeight: 'bold',
                                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                                border: `4px solid ${theme.palette.background.paper}`,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                  transform: 'scale(1.05)',
                                }
                              }}
                              onClick={triggerFileInput}
                            >
                              {safeUser.username.charAt(0).toUpperCase()}
                            </Avatar>
                          </Badge>
                          
                          {/* Upload overlay */}
                          <Box
                            className="upload-overlay"
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              borderRadius: '50%',
                              backgroundColor: dragOver ? 'rgba(102, 126, 234, 0.8)' : 'rgba(0, 0, 0, 0.5)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: 0,
                              transition: 'opacity 0.2s ease-in-out',
                              pointerEvents: 'none',
                              zIndex: 1
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'white',
                                fontWeight: 600,
                                textAlign: 'center',
                                px: 2
                              }}
                            >
                              {dragOver ? 'Drop image here' : 'Click to upload'}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
                          {safeUser.username}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CalendarIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                          <Typography variant="body2" color="text.secondary">
                            Member since {new Date().getFullYear()}
                          </Typography>
                        </Box>

                        <Chip 
                          label="Premium Member" 
                          color="primary" 
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />

                        {/* Remove profile picture button */}
                        {safeUser.avatar && (
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => {
                              updateAvatar('');
                              setSuccessMessage('Profile picture removed successfully!');
                              setShowSuccess(true);
                            }}
                            sx={{ 
                              mt: 1, 
                              color: theme.palette.error.main,
                              fontSize: '0.75rem',
                              '&:hover': {
                                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                              }
                            }}
                          >
                            Remove picture
                          </Button>
                        )}
                      </Box>

                      {/* Stats Grid */}
                      <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                        {stats.map((stat, index) => (
                          <Card key={index} sx={{ 
                            p: 2, 
                            borderRadius: 2,
                            background: theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.05)'
                              : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              {stat.icon}
                              <Box sx={{ ml: 2, flex: 1 }}>
                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                  {stat.title}
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', color: stat.color }}>
                                  {stat.value}
                                </Typography>
                              </Box>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={(stat.value / stat.max) * 100}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: stat.color,
                                  borderRadius: 3,
                                }
                              }}
                            />
                          </Card>
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>

                {/* Preferences Card */}
                <motion.div variants={itemVariants}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: { xs: 3, md: 4 }, 
                      borderRadius: 4,
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Preferences
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {isEditing ? (
                          <>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleSave}
                              startIcon={<SaveIcon />}
                              sx={{ borderRadius: 2 }}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={handleCancel}
                              startIcon={<CancelIcon />}
                              sx={{ borderRadius: 2 }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={handleEdit}
                            startIcon={<EditIcon />}
                            sx={{ borderRadius: 2 }}
                          >
                            Edit
                          </Button>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={isEditing ? editedUser?.preferences.notifications : safeUser.preferences.notifications}
                              onChange={(e) => handleInputChange('notifications', e.target.checked)}
                              disabled={!isEditing}
                              sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                  color: theme.palette.primary.main,
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                  backgroundColor: theme.palette.primary.main,
                                },
                              }}
                            />
                          }
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <NotificationsIcon sx={{ fontSize: 20 }} />
                              <Typography>Email Notifications</Typography>
                            </Box>
                          }
                        />
                        <TextField
                          fullWidth
                          select
                          label="Theme"
                          value={isEditing ? editedUser?.preferences.theme : safeUser.preferences.theme}
                          onChange={(e) => handleInputChange('theme', e.target.value)}
                          disabled={!isEditing}
                          InputProps={{
                            startAdornment: <PaletteIcon sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            }
                          }}
                        >
                          <option value="light">Light Theme</option>
                          <option value="dark">Dark Theme</option>
                        </TextField>
                      </Box>
                      <TextField
                        fullWidth
                        label="Language"
                        value={isEditing ? editedUser?.preferences.language : safeUser.preferences.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        disabled={!isEditing}
                        InputProps={{
                          startAdornment: <LanguageIcon sx={{ mr: 1, color: 'action.active' }} />,
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Box>

              {/* Right Column - Quick Actions & Stats */}
              <Box sx={{ flex: { lg: 1 } }}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 4, 
                      borderRadius: 4,
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                      height: 'fit-content',
                      position: 'sticky',
                      top: 20
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                      Quick Actions
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        component={Link}
                        to="/favorites"
                        startIcon={<FavoriteIcon />}
                        sx={{ 
                          borderRadius: 2, 
                          justifyContent: 'flex-start',
                          py: 1.5,
                          borderColor: '#667eea',
                          color: '#667eea',
                          '&:hover': {
                            borderColor: '#5a6fd8',
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                          }
                        }}
                      >
                        View Favorites
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        component={Link}
                        to="/genres"
                        startIcon={<CategoryRoundedIcon />}
                        sx={{ 
                          borderRadius: 2, 
                          justifyContent: 'flex-start',
                          py: 1.5,
                          borderColor: '#f093fb',
                          color: '#f093fb',
                          '&:hover': {
                            borderColor: '#e085e8',
                            backgroundColor: 'rgba(240, 147, 251, 0.1)',
                          }
                        }}
                      >
                        Browse Genres
                      </Button>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Account Status
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <SecurityIcon sx={{ color: theme.palette.success.main }} />
                        <Typography variant="body2">Account Verified</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <SpeedIcon sx={{ color: theme.palette.info.main }} />
                        <Typography variant="body2">Premium Access</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CalendarIcon sx={{ color: theme.palette.warning.main }} />
                        <Typography variant="body2">Active Member</Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Container>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success"
          sx={{ borderRadius: 2 }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
export { Profile }; 