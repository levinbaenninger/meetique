import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
}: Props) => (
  <div className="flex flex-col items-center justify-center gap-y-4">
    <Image alt="Empty state" height={240} src={image} width={240} />
    <div className="mx-auto flex max-w-md flex-col gap-y-1 text-center">
      <h6 className="font-medium text-lg">{title}</h6>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  </div>
);
