import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  InputBase, 
  Avatar, 
  Menu, 
  MenuItem, 
  Divider,
  IconButton,
  useTheme as useMuiTheme,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  ClickAwayListener,
  Button,
} from '@mui/material';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import SearchIcon from '@mui/icons-material/Search';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../../context/AuthContext';
import { searchAnime } from '../../api/jikan';

const Topbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchPreview, setShowSearchPreview] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const theme = useMuiTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserClick = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearchPreview(false);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearchPreview(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim().length >= 2) {
      // Set loading state
      setSearchLoading(true);
      setShowSearchPreview(true);

      // Debounce search
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchAnime(query, 1);
          setSearchResults(results.slice(0, 5)); // Show only first 5 results
        } catch (error) {
          console.error('Search preview error:', error);
          setSearchResults([]);
        } finally {
          setSearchLoading(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setShowSearchPreview(false);
      setSearchLoading(false);
    }
  };

  const handleSearchResultClick = (anime: any) => {
    navigate(`/anime/${anime.mal_id}`);
    setSearchQuery('');
    setShowSearchPreview(false);
  };

  const handleClickAway = () => {
    setShowSearchPreview(false);
  };

  const getUserInitials = () => {
    if (!user) return 'U';
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ 
        height: '64px', 
        color: theme.palette.text.primary, 
        display: 'flex', 
        alignItems: 'center', 
        px: 3,
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 1px 3px rgba(0,0,0,0.3)' 
          : '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1000
      }}>
        {/* Left: Topbar Icon and Title */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          minWidth: 'fit-content',
          flexShrink: 0,
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
            transition: 'opacity 0.2s ease-in-out'
          }
        }} onClick={() => navigate('/')}>
          <NightsStayRoundedIcon sx={{ fontSize: 32, marginRight: 2, color: theme.palette.primary.main }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            AzukiCloud
          </Typography>
        </Box>
        
        {/* Center: Search Bar */}
        <Box sx={{ 
          display: { xs: 'none', md: 'flex' }, // Hide on small screens
          alignItems: 'center', 
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
          borderRadius: 3, 
          px: 3, 
          mx: { xs: 1, md: 4 }, 
          flex: 1, 
          maxWidth: 600,
          minWidth: 200,
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            border: `1px solid ${theme.palette.primary.main}`,
            boxShadow: `0 0 0 3px ${theme.palette.primary.main}15`,
            transform: 'translateY(-1px)',
          },
          '&:focus-within': {
            border: `1px solid ${theme.palette.primary.main}`,
            boxShadow: `0 0 0 3px ${theme.palette.primary.main}25`,
            transform: 'translateY(-1px)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
            zIndex: -1,
          },
          '&:hover::before': {
            opacity: 0.05,
          }
        }}>
          <SearchIcon 
            sx={{ 
              color: theme.palette.text.secondary, 
              mr: 2, 
              fontSize: 20,
              transition: 'color 0.3s ease-in-out',
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.main,
              }
            }}
            onClick={handleSearchClick}
          />
          <InputBase 
            placeholder="Search anime, movies, TV shows..." 
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearch}
            sx={{ 
              width: '100%', 
              fontSize: '15px',
              color: theme.palette.text.primary,
              fontWeight: 500,
              '& input': {
                color: theme.palette.text.primary,
                '&::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 0.7,
                  fontWeight: 400,
                },
                '&:focus::placeholder': {
                  opacity: 0.5,
                }
              },
              '& .MuiInputBase-input': {
                padding: '12px 0',
              }
            }} 
          />
          {/* Search suggestions indicator */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            ml: 2,
            opacity: 0.6,
            transition: 'opacity 0.3s ease-in-out',
            '&:hover': {
              opacity: 1,
            }
          }}>
            <Typography variant="caption" sx={{ 
              color: theme.palette.text.secondary,
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              Enter
            </Typography>
          </Box>

          {/* Search Preview Dropdown */}
          {showSearchPreview && (
            <Paper
              elevation={8}
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                mt: 1,
                maxHeight: 400,
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                zIndex: 1001,
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 8px 32px rgba(0,0,0,0.4)' 
                  : '0 8px 32px rgba(0,0,0,0.15)',
              }}
            >
              {searchLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : searchResults.length > 0 ? (
                <List sx={{ p: 0 }}>
                                     {searchResults.map((anime) => (
                     <ListItem
                       key={anime.mal_id}
                       onClick={() => handleSearchResultClick(anime)}
                       sx={{
                         '&:hover': {
                           backgroundColor: theme.palette.action.hover,
                         },
                         py: 1.5,
                         px: 2,
                         cursor: 'pointer',
                       }}
                     >
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Box
                          component="img"
                          src={anime.images?.jpg?.small_image_url || anime.images?.jpg?.image_url}
                          alt={anime.title}
                          sx={{
                            width: 40,
                            height: 56,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={anime.title}
                        secondary={anime.type || 'TV'}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 500,
                          noWrap: true,
                        }}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          color: 'text.secondary',
                        }}
                      />
                    </ListItem>
                  ))}
                  <Divider />
                                     <ListItem
                     onClick={handleSearchClick}
                     sx={{
                       '&:hover': {
                         backgroundColor: theme.palette.action.hover,
                       },
                       py: 1.5,
                       px: 2,
                       cursor: 'pointer',
                     }}
                   >
                    <ListItemText
                      primary={`View all results for "${searchQuery}"`}
                      primaryTypographyProps={{
                        variant: 'body2',
                        color: 'primary.main',
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                </List>
              ) : searchQuery.trim().length >= 2 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No results found
                  </Typography>
                </Box>
              ) : null}
            </Paper>
          )}
        </Box>
        
        {/* Right: User menu or login/register */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
          {user ? (
            <>
              <IconButton onClick={handleClick} size="large">
                <Avatar src={user.avatar} alt={user.username} sx={{ bgcolor: theme.palette.primary.main }}>
                  {getUserInitials()}
                </Avatar>
                <KeyboardArrowDownRoundedIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleUserClick}>
                  <PersonRoundedIcon sx={{ mr: 1 }} /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutRoundedIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="primary" variant="outlined" onClick={() => navigate('/login')}>Login</Button>
              <Button color="primary" variant="contained" onClick={() => navigate('/register')}>Register</Button>
            </>
          )}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default Topbar;
