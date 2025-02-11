
import express, { Request, Response, Router } from 'express';

const router = express.Router()
router.get('/', async (req: Request, res: any) => {
    return res.status(200).json({ sorteo: 'algo' })
});

// router.post('/', async (req: Request, res: Response) => {
//     try {
//         const { name, dateStart, organizationId, description, numberCount } = req.body;
//         if (!name || typeof name !== 'string') return res.status(400).json({ error: msgNameRequired });
//         if (!organizationId) return res.status(400).json({ error: 'The raffle must be associated with an organization.' });
//         if (!numberCount) return res.status(400).json({ error: `The "numberCount" is required` });
//         if (typeof numberCount != 'number') return res.status(400).json({ error: `The "numberCount" must be a number` });
//         if (dateStart) {
//             if (!isValidISO8601(dateStart)) return res.status(400).json({ error: msgDateFormatError });
//         }

//         Sorteo.create({
//             name: name,
//             numberCount: numberCount,
//             description: description,
//             dateStart: dateStart,
//             organizationId: organizationId,
//         })
//             .then((sorteo) => {
//                 return res.status(201).json(sorteo);
//             })
//             .catch(() => {
//                 return res.status(500).json({ error: msgServerError });
//             });

//     } catch (e) {
//         return res.status(500).json(msgServerError)
//     }

// });


// get all sorteos
// router.get('/', async (req: Request, res: Response) => {
//     const sorteos = await Sorteo.findAll();
//     return res.status(200).json(sorteos)
// });



// // get sorteo by id
// router.get('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params
//     if (!validateUUID(id)) return res.status(400).json({ error: msgUUIDInvalid })
//     const sorteo = await Sorteo.findAll({
//         include:
//             [{ model: RaffleNumber, required: false },
//             { model: User, required: false },
//             { model: Seller, required: false }
//             ],
//         where: { id: id }
//     });
//     return res.status(200).json(sorteo)
// });


// // create a sorteo
// router.post('/', async (req: Request, res: Response) => {
//     try {
//         const { name, dateStart, organizationId, description, numberCount } = req.body;
//         if (!name || typeof name !== 'string') return res.status(400).json({ error: msgNameRequired });
//         if (!organizationId) return res.status(400).json({ error: 'The raffle must be associated with an organization.' });
//         if (!numberCount) return res.status(400).json({ error: `The "numberCount" is required` });
//         if (typeof numberCount != 'number') return res.status(400).json({ error: `The "numberCount" must be a number` });
//         if (dateStart) {
//             if (!isValidISO8601(dateStart)) return res.status(400).json({ error: msgDateFormatError });
//         }

//         Sorteo.create({
//             name: name,
//             numberCount: numberCount,
//             description: description,
//             dateStart: dateStart,
//             organizationId: organizationId,
//         })
//             .then((sorteo) => {
//                 return res.status(201).json(sorteo);
//             })
//             .catch(() => {
//                 return res.status(500).json({ error: msgServerError });
//             });

//     } catch (e) {
//         return res.status(500).json(msgServerError)
//     }

// });


// // update a Sorteo
// router.patch('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params
//     const { name, dateStart, numberCount, description, organizationId } = req.body
//     if (name) {
//         if (typeof name != 'string') return res.status(400).json({ error: msgNameRequired })
//     }
//     if (dateStart) {
//         if (!isValidISO8601(dateStart)) return res.status(400).json({ error: msgDateFormatError });
//     }
//     if (numberCount) {
//         if (typeof numberCount != 'number') return res.status(400).json({ error: `The "numberCount" must be a number` });
//     }
//     if (description) {
//         if (typeof description !== 'string') return res.status(400).json({ error: msgDescriptionString });
//         if (description.length > 1500) return res.status(400).json({ error: msgDescriptionLength });
//     }
//     Sorteo.update(
//         {
//             name: name,
//             description: description,
//             dateStart: dateStart,
//             organizationId: organizationId,
//             numberCount: numberCount,
//         },
//         { where: { id: id } }
//     )
//         .then(() => {
//             return res.status(200).json();
//         })
//         .catch(() => {
//             return res.status(500).json({ error: msgServerError });
//         });
// });


// // delete a Sorteo
// router.delete('/:id', async (req: Request, res: Response) => {
//     const { id } = req.params
//     Sorteo.destroy({ where: { id: id } })
//         .then(() => { return res.status(200).json() })
//         .catch(() => { return res.status(500).json({ error: msgServerError }) })
// });

export default router;