export default function Link(props: any) {
  return (
    <a href={props.value.href}>
      <strong className="hover:underline text-rose-800">
        {props.children}
      </strong>
    </a>
  );
}
