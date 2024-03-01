import duckdb from 'duckdb-lambda-x86';


const duckdbFactory = async () => {
    const db = new duckdb.Database(':memory:');
    const con = db.connect()
    const execute = (statement) => new Promise((resolve, reject) => {
        con.all(statement, function (err, res) {
            if (err) {
                reject(err);

            }
            resolve(res)
        });

    })
    const close = () => db.close()

    await execute("INSTALL httpfs;")
    await execute("LOAD httpfs;")
    await execute("SET s3_region='eu-west-3';")
    await execute(`SET s3_access_key_id='${process.env.AWS_ACCESS_KEY_ID}';`)
    await execute(`SET s3_secret_access_key='${process.env.AWS_SECRET_ACCESS_KEY}';`)

    return { execute, close }
}


export {
    duckdbFactory,
}