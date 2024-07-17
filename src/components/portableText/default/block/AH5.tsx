export default function AH5(props: any) {
  return (
    <h5 className="text-2xl" id={props.value.id}>
      {props.children}
    </h5>
  );
}
