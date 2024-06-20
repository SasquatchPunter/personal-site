export default function Code(props: any) {
  return (
    <code className="bg-gray-600 px-2 rounded-md border-gray-500 bg-opacity-40 border">
      {props.children}
    </code>
  );
}
