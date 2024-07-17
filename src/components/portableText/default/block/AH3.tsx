export default function AH3(props: any) {
  return (
    <h3 className="text-4xl" id={props.value.id}>
      {props.children}
    </h3>
  );
}
