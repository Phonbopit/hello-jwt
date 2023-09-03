const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

// เป็นแค่ตัวอย่าง ในการใช้งานจริง ไม่ควรประกาศ secretKey ไว้ในโค๊ด
// แต่ควรจะโหลดจาก environment variables เช่น .env แทน
const secretKey = 'secretKey'

app.get('/', (req, res) => res.json({ message: 'Hello JWT' }))

app.get('/token', (req, res) => {
  const payload = {
    id: 1,
    displayName: 'John Doe',
    role: 'admin',
  }

  const token = jwt.sign(payload, secretKey, { expiresIn: 60 })

  res.json({
    token,
  })
})

app.get('/protected', (req, res) => {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, secretKey + 'ss')

    res.json({
      message: 'Hello! You are authorized',
      decoded,
    })
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      error: error.message,
    })
  }
})

app.listen(5000, () => console.log('Application is running on port 5000'))
