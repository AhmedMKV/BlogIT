import jsonServer from 'json-server';
import auth from 'json-server-auth';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

server.db = router.db;

const rules = auth.rewriter({
  users: 640,
  blogs: 644,
});

server.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

server.use(jsonServer.defaults());
server.use(rules);
server.use(auth);
server.use(router);

server.post('/blogs', (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (req.body.userId !== req.user.id) {
    return res.status(403).json({ error: 'Invalid user ID' });
  }
  
  next();
});

server.put('/blogs/:id', (req, res, next) => {
  const blogId = req.params.id;
  const blogs = server.db.get('blogs').value();
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  if (blog.authorId !== req.user.id) {
    return res.status(403).json({ error: 'You are not authorized to edit this blog' });
  }

  req.body.authorId = blog.authorId;
  req.body.userId = blog.userId;
  next();
});

server.delete('/blogs/:id', (req, res, next) => {
  const blogId = req.params.id;
  const blogs = server.db.get('blogs').value();
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  if (blog.authorId !== req.user.id) {
    return res.status(403).json({ error: 'You are not authorized to delete this blog' });
  }

  server.db.get('blogs')
    .remove({ id: blogId })
    .write();

  res.status(200).json({ message: 'Blog deleted successfully' });
});



const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server with Auth is running on port ${PORT}`);
});
