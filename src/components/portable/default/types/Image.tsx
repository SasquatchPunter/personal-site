import BaseImage from './BaseImage'

export default function Image(props) {
  return (
    <p>
      <BaseImage
        className="w-full object-cover rounded-xl"
        source={props.value}
        width={400}
        height={300}
      />
    </p>
  )
}
