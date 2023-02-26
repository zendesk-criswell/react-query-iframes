import React from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      return data
    },
  })
}

function Example () {
  const { data } = usePosts()

  return (
    <div>
      <h1>iframe</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={window.parent.queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
