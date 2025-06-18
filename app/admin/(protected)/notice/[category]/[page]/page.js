import PostList from "@/components/PostList";

const Notice = ({ params, searchParams }) => {
  const { category, page } = params;
  const { search } = searchParams;

  return (
    <div className="p-10">
      <PostList category={category} page={page} search={search} isAdmin />
    </div>
  );
};
export default Notice;
