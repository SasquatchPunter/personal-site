export default function Link(props) {
  return (
    <a href={props.value.href}>
      <strong className="hover:underline text-rose-800">
        {props.children}
      </strong>
    </a>
  )
}
