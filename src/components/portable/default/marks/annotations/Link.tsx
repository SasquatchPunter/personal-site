export default function Link(props: any) {
  return (
    <a target="_blank" href={props.value.href}>
      <strong className="hover:underline text-rose-800">
        {props.children}
      </strong>
    </a>
  );
}
