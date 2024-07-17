export default function AH2(props: any) {
  return (
    <h2 className="text-5xl" id={props.value.id}>
      {props.children}
    </h2>
  );
}
