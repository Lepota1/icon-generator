export function FormGroup(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div {...props} className="flex flex-col gap-2">
      {props.children}
    </div>
  );
}
