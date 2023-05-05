import { defineDns } from '@stacksjs/config'

/**
 * **DNS Options**
 *
 * This configuration defines all of your DNS options. Because Stacks is fully-typed, you
 * may hover any of the options below and the definitions will be provided. In case you
 * have any questions, feel free to reach out via Discord or GitHub Discussions.
 */
export default defineDns({
  a: [
    {
      name: '',
      address: '',
      ttl: 300,
    },
  ],
  aaaa: [],
  cname: [],
  txt: [],
  mx: [],
})
