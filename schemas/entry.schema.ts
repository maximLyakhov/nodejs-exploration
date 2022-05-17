import { Schema, model as Model } from 'mongoose'

interface Entry {
  name: string
  cost: number
  avatar?: string
}

const schema = new Schema<Entry>({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: false
  }
})

const EntryModel = Model<Entry>('Entry', schema)

export async function run (): Promise<void> {
  const doc = new EntryModel({
    name: 'Bill',
    cost: 100,
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  })

  await doc.save()
}
