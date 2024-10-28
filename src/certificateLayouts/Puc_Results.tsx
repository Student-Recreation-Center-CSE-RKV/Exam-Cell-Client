import React from 'react';
import { parseISO, format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';


interface Subject {
  PCODE: string;
  PNAME: string;
  CR: number;
  GR: string;
  CCMY: string;
  ATTEMPT:string;
}

interface Record {
  SUBJECTS: Subject[];
  SGPA: number;
  CGPA: number;
}

interface Details {
  SNAME: string;
  DOB: string;
  GRP: string;
  ID: string;
  PUC_RECORDS: Record[];
}

interface PucResultsProps {
  details: Details;
}

const PucResults = ({ details }: PucResultsProps) => {
  const recentCCMY = details.PUC_RECORDS.reduce(
    (latest: Date | null, sem: any) => {
      sem.SUBJECTS.forEach((subject: any) => {
        const subjectDate = new Date(subject.CCMY);
        if (!latest || subjectDate > latest) {
          latest = subjectDate;
        }
      });
      return latest;
    },
    null
  );
  const formattedCCMY = recentCCMY ? format(recentCCMY, "MMM-yyyy") : "N/A"; 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: '70px', fontWeight: "bold" }}>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0, marginLeft: "40px" }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "55px" }}>Name</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>{details.SNAME}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "55px" }}>Major</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>Pre University Course</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0, marginRight: "40px" }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "80px" }}>ID</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>{details.ID}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ minWidth: "80px" }}>Admission</p>
            <p style={{ margin: "0 10px" }}>:</p>
            <p>December-2020</p>
          </div>
        </div>
      </div>

      {details.PUC_RECORDS.map((record, index) => {
        const year = Math.floor(index / 2) + 1;
       
        return (
          <TableContainer
            component={Paper}
            elevation={0}
            key={`sem-${index}`}
            style={{ marginTop: '20px', width: '70%', textAlign: 'center' }}
          >
            <Table sx={{ border: '2px solid black', width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{
                      borderBottom: '2px solid black',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      textAlign: 'center',
                      padding: '5px',
                    }}
                  >
                    {year === 1 ? "I" : "II"}{" "}
                    {index % 2 === 0 ? "Year I Semester" : "Year II Semester"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}><strong>SUBCODE</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}><strong>SUBNAME</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}><strong>CREDITS</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}><strong>GRADE</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px', width: '10%' }}><strong>EXAM DATE</strong></TableCell>
                  <TableCell align="center" sx={{ border: '2px solid black', padding: '3px', width: '10%' }}><strong>ATTEMPT</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {record.SUBJECTS.map((subject, idx) => (
                  <TableRow key={`subject-${idx}`}>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}>{subject.PCODE}</TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px', textAlign: "left", paddingLeft: "80px" }}>{subject.PNAME}</TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}>{subject.CR.toFixed(1)}</TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}>
                      {subject.GR === "EX" ? subject.GR.charAt(0).toUpperCase() + subject.GR.slice(1).toLowerCase() : subject.GR}
                    </TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}>{formattedCCMY}</TableCell>
                    <TableCell align="center" sx={{ border: '2px solid black', padding: '3px' }}>{subject.ATTEMPT}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ border: '2px solid black', padding: '3px', textAlign: "center" }}><strong>SGPA: {record.SGPA}</strong></TableCell>
                  <TableCell colSpan={2} align="center" sx={{ border: '2px solid black', padding: '3px' }}><strong>CGPA: {record.CGPA}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
    </div>
  );
};

export default PucResults;
