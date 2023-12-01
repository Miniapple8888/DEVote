import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Button, DialogContent } from "@mui/material";
import { startElection } from "../../contracts/devote";

const CreateElection = () => {
  const [text, setText] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onSubmitCandidates = () => {
    if (candidates.length < 2) {
      setError("ERROR: Too few candidates");
    } else if (new Set(candidates).size !== candidates.length) {
      setError("ERROR: Candidates must be unique");
    } else {
      setIsModalOpen(true);
      setError("");
    }
  };
  const addCandidate = (event) => {
    event.preventDefault();
    setCandidates((candidates) => [...candidates, text]);
    setText("");
  };
  const removeCandidate = (idx) => {
    setCandidates(candidates.filter((c, i) => i !== idx));
  };

  const onSubmit = async () => {
    try {
      await startElection(candidates);
      console.log("Candidates submitted");
      setIsModalOpen(false);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        <form className="mb-8" onSubmit={addCandidate}>
          <div className="flex items-stretch">
            <TextField
              label="Enter Candidate..."
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onSubmit={addCandidate}
            />
            <Button
              sx={{ marginLeft: "10px" }}
              type="submit"
              variant="contained"
              onClick={addCandidate}
            >
              Add
            </Button>
          </div>
        </form>
        {candidates.map((candidate, i) => (
          <Button
            key={i}
            sx={{
              marginRight: "4px",
              ":hover": {
                textDecoration: "line-through",
                textDecorationThickness: "2px",
              },
            }}
            variant="outlined"
            onClick={() => removeCandidate(i)}
          >
            {candidate}
          </Button>
        ))}
        {candidates.length > 0 && <p>Click candidate name to remove</p>}
        {error && <p className="text-red-600">{error}</p>}
        <Button
          sx={{ display: "block", "margin-top": "24px" }}
          variant="contained"
          onClick={onSubmitCandidates}
        >
          Submit
        </Button>
      </div>
      <Dialog open={isModalOpen}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm send of the inputted candidates?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={onSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateElection;