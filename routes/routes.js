module.exports = (app) => {
  const mysql = require("../utils/async-mysql").promisifiedMySql();

    app.get('/', (req, res) => {
        res.status(200).json({
            message:
                'Welcome to Esay Services',
        });
    });


    app.get('/check-status', async(req, res) => {
  
       try {
        const rows = await mysql.query('SELECT id, board_name, client_status, board_status from control_board where client_status != board_status');

        const data = JSON.parse(JSON.stringify(rows));

        if(data.length > 0){
            res.status(200).json({message: '1', data: data})
        }else{
            res.status(200).json({message: '0', data: data})
        }

       } catch (error) {
           res.status(500).json({message: error.message})
       }
    })

    app.post('/send-status', async(req, res) => {
        const { devices } = req.body;

        try {
            for(let device of devices){
                const parameter = [device.id, device.board_status]
                await mysql.query('update control_board set board_status = ? where id = ?', parameter)
            }
            res.status(200).json({message: 'OK'})
        } catch (error) {
            res.status(500).json({message: error.message}) 
        }

        
    })


    app.get('/appliances', async (req, res) => {
        try {
            const rows = await mysql.query('select * from control_board');

            res.status(200).json({message: 'OK', data: rows})
        
           } catch (error) {
               res.status(500).json({message: error.message})
           }
    })

    app.post('/appliances', async (req, res) => {
        const { id, client_status } = req.body;

        try {
            const parameter = [client_status, id, ]
            await mysql.query('update control_board set client_status = ? where id = ?', parameter)

            res.status(200).json({message: 'Command sent, waiting for feedback...'})

        } catch (error) {
            res.status(500).json({message: error.message}) 
        }
    })


}