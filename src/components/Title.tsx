type TitleProps = {
    children: string
}

export default function Title({children}: TitleProps) {
  return (
    <h2 style={{textAlign: 'center'}}>{children}</h2>
  )
}