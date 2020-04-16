import axios from 'axios';
import { Link } from '../../types/Link';
import { Links } from '../../types/Links';
import { Tag } from '../../types/Tag';

export function fetchTags(links: Links): Promise<Tag[]> {
  return axios
    .get(links.tags.getOriginalLink())
    .then((response) => response.data)
    .then(convertTagsResource);
}

function convertTagsResource(data: any) {
  return data._embedded.tags.map((rawTag) => ({
    id: rawTag.id,
    label: rawTag.label,
    links: { self: new Link(rawTag._links.self) },
  }));
}
