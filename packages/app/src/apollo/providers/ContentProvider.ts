import { Entry } from "./../types";
import {
  FetchResult,
  gql,
  MutationFunctionOptions,
  QueryResult,
  useMutation,
  useQuery,
} from "@apollo/client";

export class ContentProviderImpl implements ContentProvider {
  getContentForDay(day: number) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Entry>(QUERY_CONTENT, {
      variables: {
        day: day,
      },
    });
  }
  saveContent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [update] = useMutation<boolean>(MUTATION_CONTENT);
    return update;
  }
}

interface ContentProvider {
  getContentForDay(day: number): QueryResult<Entry, Record<string, any>>;
  saveContent(): (
    options?: MutationFunctionOptions<boolean, Record<string, any>> | undefined
  ) => Promise<FetchResult<boolean, Record<string, any>, Record<string, any>>>;
}

export const QUERY_CONTENT = gql`
  query GetEntry($day: Float!) {
    getEntry(day: $day) {
      content
    }
  }
`;

const MUTATION_CONTENT = gql`
  mutation SaveEntry($day: Float!, $content: String!) {
    saveEntry(content: $content, day: $day)
  }
`;

export default ContentProvider;
