export default function Category({id, id_category, name}) {
    return (
        id_category ?
            <a
                href={`/${id_category}/${id}`}
            >
                {name}
            </a>
            :
            <a
                href={`/${id}`}
            >
                {name}
            </a>
    )
}