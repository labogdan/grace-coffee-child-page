import faunadb from 'faunadb'

const client = new faunadb.Client({ secret: `${process.env.REACT_APP_FAUNADB_KEY}` })
const q = faunadb.query

const createChild = (obj) => client.query(
  q.Map(obj,
    q.Lambda('beneficiary_id',
      q.Create(
        q.Collection('Child'),
        {
          data: q.Var('beneficiary_id')
        }
      )
    )
  )
)
.then(ret => ret)
.catch(err => console.warn(err))


export default createChild
