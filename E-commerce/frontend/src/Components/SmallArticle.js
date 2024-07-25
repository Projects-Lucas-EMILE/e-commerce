import React from "react";

export default function SmallArticle({
  id,
  img,
  name,
  desc,
  price,
  id_category,
  name_category,
  id_subcategory,
  name_subcategory,
    discount
}) {
  let pricediscounted = "";
  let smalldesc = desc;
  if (desc.length > 77) {
    smalldesc = desc.slice(0, 77);
    smalldesc = smalldesc + "...";
  }

  if (discount) {
    pricediscounted = (price - (discount * price) / 100);
  }

  return (
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg text-left xl:aspect-w-7 xl:aspect-h-8">
      <a className="small-article-link" href={`${id_category}/${id_subcategory}/${id}/${name}`}>
        <div className="h-40 w-full rounded-t-lg overflow-hidden">
          <img
            src={img}
            alt={name}
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="text-xl font-bold mt-2 hover:no-underline">{name}</h1>
        <h2 className="font-semibold text-lg flex gap-2 text-[#f553c7] items-baseline">
          {name_category}
          <p className="text-black font-medium text-sm">{name_subcategory}</p>
        </h2>
        <p className="text-md font-light">{smalldesc}</p>
        {pricediscounted !== "" ?
            <div className={"flex items-baseline gap-4 mt-2"}>
              <h3 className="text-xl text-[#f553c7] font-semibold hover:no-underline">{pricediscounted.toFixed(2)} €</h3>
              <div className={"flex items-baseline gap-2"}>
              <h3 className="text-lg line-through">{price.toFixed(2)} €</h3>
              <h3 className="text-lg text-[#f553c7]">-{discount}%</h3>
              </div>
            </div>
            :
        <h3 className="text-xl font-semibold mt-2 hover:no-underline">{price.toFixed(2)} €</h3>
        }
      </a>
    </div>
  );
}
