const Post = ({ params }) => {
  const { postId } = params;
  return (
    <div>
      <h1>Post ID: {params.id}</h1>
      <p>This is the content of the post with ID: {params.id}</p>
    </div>
  );
};

export default Post;
