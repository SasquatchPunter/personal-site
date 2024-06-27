export default function SectionRule(props: any) {
  const { visible } = props.value;
  return visible ? <hr className="border-t" /> : undefined;
}
