import { CardSpotlight } from "@/components/ui/card-spotlight";

interface Props {
  title: string
}

export function HoverCard({title}:Props) {
  return (
    <CardSpotlight className=" mt-4 cursor-pointer w-96">
      <p className="text-xl font-bold relative z-20 text-white">
        {title}
      </p>
     
    </CardSpotlight>
  );
}

