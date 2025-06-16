import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteBlog } from "../services/api";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Blog = ({ blog, onDelete }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    navigate(`/edit/${blog.id}`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      await deleteBlog(blog.id, authToken);
      onDelete(blog.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
      if (error.response?.status === 401) {
        navigate("/AuthPage", { state: { from: "/" } });
      } else if (error.response?.status === 403) {
        alert("You are not authorized to delete this blog");
      } else {
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  const getImageSource = () => {
    if (blog.image) {
      if (
        typeof blog.image === "string" &&
        blog.image.startsWith("data:image")
      ) {
        return blog.image;
      }
      if (typeof blog.image === "object" && blog.image.url) {
        return blog.image.url;
      }
    }
    return "https://picsum.photos/id/237/200/300";
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 40,
              height: 40,
            }}
            aria-label="blog"
          >
            {(blog.author && blog.author[0]) || "U"}
          </Avatar>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {blog.title}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        height="400"
        image={getImageSource()}
        alt={blog.title}
        sx={{
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          {blog.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            lineHeight: 1.7,
          }}
        >
          {blog.content
            ? `${blog.content.substring(0, 150)}...`
            : "No content available"}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          px: 2,
        }}
      >
        {user && user.id === blog.authorId && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="edit"
              onClick={handleEdit}
              sx={{
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={handleDeleteClick}
              sx={{
                "&:hover": {
                  color: theme.palette.error.main,
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          sx={{
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ backgroundColor: theme.palette.background.default }}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              color: theme.palette.text.secondary,
              whiteSpace: "pre-wrap",
            }}
          >
            {blog.content}
          </Typography>
        </CardContent>
      </Collapse>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Blog</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this blog post? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Blog;
