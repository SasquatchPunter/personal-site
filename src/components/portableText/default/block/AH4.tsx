export default function AH4(props: any) {
  return (
    <h4 className="text-3xl" id={props.value.id}>
      {props.children}
    </h4>
  );
}
