import Image from 'next/image';
import { Item } from '@/types';

type Props = Omit<Item, 'id'>;

export const Card = ({ title, description, imageUrl, price, type }: Props) => {
  return (
    <div className="w-full max-w-s bg-[#191919] p-8 rounded-md flex flex-col gap-8 text-center group">
      <div className="relative w-full aspect-[12/9]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        <span
          className={`absolute top-2 left-2 py-2 px-3 rounded-full text-xs text-white ${
            type === 'arabic'
              ? 'bg-[#77A9B0]'
              : 'bg-[#3A383D]'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <h3 className="text-[24px] text-[#D3AD7F]">{title}</h3>
        <p className="text-[16px] text-[#909090]">{description}</p>
      </div>
      <p className="text-[20px] text-white mt-4">{`${price} €`}</p>
    </div>
  );
};
